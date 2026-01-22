import React, { createContext, useContext, useState, useCallback } from 'react';
import { PAYMENT_STATUS, OrderPayment } from '../Services/PaymentService';

/**
 * Payment Context
 * Manages payment state and processing across the app
 */
const PaymentContext = createContext();

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within PaymentProvider');
  }
  return context;
};

export const PaymentProvider = ({ children }) => {
  const [currentPayment, setCurrentPayment] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  /**
   * Initiate a new payment
   */
  const initiatePayment = useCallback((orderId, amount, currency = 'USD') => {
    const payment = new OrderPayment(orderId, amount, currency);
    setCurrentPayment(payment);
    setPaymentError(null);
    return payment;
  }, []);

  /**
   * Process payment (call payment service)
   */
  const processPayment = useCallback(async (paymentData, paymentService) => {
    setIsProcessing(true);
    setPaymentError(null);

    try {
      if (!paymentService) {
        throw new Error('Payment service not configured');
      }

      const result = await paymentService.processPayment(paymentData);

      if (result.status === PAYMENT_STATUS.SUCCESS) {
        const updatedPayment = currentPayment.updateStatus(
          PAYMENT_STATUS.SUCCESS,
          { transactionId: result.transactionId }
        );
        setCurrentPayment(updatedPayment);
        setPaymentHistory([...paymentHistory, updatedPayment]);
      } else {
        throw new Error(result.error || 'Payment processing failed');
      }

      return result;
    } catch (error) {
      setPaymentError(error.message);
      currentPayment?.updateStatus(PAYMENT_STATUS.FAILED);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [currentPayment, paymentHistory]);

  /**
   * Refund payment
   */
  const refundPayment = useCallback(async (paymentService, amount = null) => {
    if (!currentPayment) {
      throw new Error('No payment to refund');
    }

    if (!currentPayment.canBeRefunded()) {
      throw new Error('Payment cannot be refunded');
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      const result = await paymentService.refundPayment(
        currentPayment.transactionId,
        amount
      );

      if (result.success) {
        const refundedPayment = currentPayment.updateStatus(
          PAYMENT_STATUS.SUCCESS,
          { refundId: result.refundId }
        );
        setCurrentPayment(refundedPayment);
      }

      return result;
    } catch (error) {
      setPaymentError(error.message);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [currentPayment]);

  /**
   * Clear current payment
   */
  const clearCurrentPayment = useCallback(() => {
    setCurrentPayment(null);
    setPaymentError(null);
  }, []);

  /**
   * Get payment by transaction ID
   */
  const getPaymentByTransactionId = useCallback(
    (transactionId) => {
      return paymentHistory.find((p) => p.transactionId === transactionId);
    },
    [paymentHistory]
  );

  const value = {
    // State
    currentPayment,
    paymentHistory,
    isProcessing,
    paymentError,

    // Actions
    initiatePayment,
    processPayment,
    refundPayment,
    clearCurrentPayment,
    getPaymentByTransactionId,

    // Computed
    isPaymentComplete: currentPayment?.isComplete() ?? false,
  };

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
};

export default PaymentContext;
