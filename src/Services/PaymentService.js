/**
 * URBAN CART - Payment Gateway Architecture
 * 
 * Clean separation of concerns
 * Ready for Stripe / Razorpay integration
 * No fake payment logic - structure only
 */

// Payment method types
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  UPI: 'upi',
  WALLET: 'wallet',
};

// Payment status types
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SUCCESS: 'success',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
};

/**
 * Payment Provider Configuration
 * Add your actual provider credentials here
 */
export const PAYMENT_PROVIDERS = {
  STRIPE: {
    name: 'Stripe',
    publicKey: process.env.REACT_APP_STRIPE_PUBLIC_KEY,
    enabled: !!process.env.REACT_APP_STRIPE_PUBLIC_KEY,
  },
  RAZORPAY: {
    name: 'Razorpay',
    keyId: process.env.REACT_APP_RAZORPAY_KEY_ID,
    enabled: !!process.env.REACT_APP_RAZORPAY_KEY_ID,
  },
};

/**
 * Payment Service Interface
 * Implement this interface for each payment provider
 */
export class PaymentService {
  constructor(provider) {
    this.provider = provider;
  }

  /**
   * Initialize payment provider
   * @returns {Promise<boolean>}
   */
  async initialize() {
    throw new Error('initialize() must be implemented by subclass');
  }

  /**
   * Create payment intent
   * @param {Object} paymentData - { amount, currency, description, orderId }
   * @returns {Promise<Object>} - { clientSecret, paymentIntentId }
   */
  async createPaymentIntent(paymentData) {
    throw new Error('createPaymentIntent() must be implemented by subclass');
  }

  /**
   * Process payment
   * @param {Object} paymentData - { amount, currency, paymentMethod, orderId }
   * @returns {Promise<Object>} - { status, transactionId, error }
   */
  async processPayment(paymentData) {
    throw new Error('processPayment() must be implemented by subclass');
  }

  /**
   * Retrieve payment status
   * @param {string} paymentId
   * @returns {Promise<Object>} - { status, amount, currency, timestamp }
   */
  async getPaymentStatus(paymentId) {
    throw new Error('getPaymentStatus() must be implemented by subclass');
  }

  /**
   * Refund payment
   * @param {string} paymentId
   * @param {number} amount - Optional: partial refund amount
   * @returns {Promise<Object>} - { success, refundId, status }
   */
  async refundPayment(paymentId, amount = null) {
    throw new Error('refundPayment() must be implemented by subclass');
  }
}

/**
 * Order Payment Model
 * Represents a payment transaction
 */
export class OrderPayment {
  constructor(orderId, amount, currency = 'USD') {
    this.orderId = orderId;
    this.amount = amount;
    this.currency = currency;
    this.status = PAYMENT_STATUS.PENDING;
    this.paymentMethod = null;
    this.transactionId = null;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Update payment status
   * @param {string} newStatus
   * @param {Object} metadata - Additional data to store
   */
  updateStatus(newStatus, metadata = {}) {
    this.status = newStatus;
    this.updatedAt = new Date();
    if (metadata.transactionId) {
      this.transactionId = metadata.transactionId;
    }
    return this;
  }

  /**
   * Check if payment is complete
   */
  isComplete() {
    return this.status === PAYMENT_STATUS.SUCCESS;
  }

  /**
   * Check if payment can be refunded
   */
  canBeRefunded() {
    return this.status === PAYMENT_STATUS.SUCCESS;
  }
}

/**
 * Payment Validation
 * Validates payment data before processing
 */
export const validatePaymentData = (paymentData) => {
  const errors = [];

  if (!paymentData.amount || paymentData.amount <= 0) {
    errors.push('Amount must be greater than 0');
  }

  if (!paymentData.currency || paymentData.currency.length !== 3) {
    errors.push('Invalid currency code');
  }

  if (!paymentData.orderId) {
    errors.push('Order ID is required');
  }

  if (!paymentData.paymentMethod) {
    errors.push('Payment method is required');
  }

  if (!Object.values(PAYMENT_METHODS).includes(paymentData.paymentMethod)) {
    errors.push('Invalid payment method');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Currency Converter (placeholder)
 * Replace with actual conversion logic or API
 */
export const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  // TODO: Implement real currency conversion
  // For now, just return the amount as-is
  return amount;
};

/**
 * Payment Error Handler
 * Standardizes payment error responses
 */
export class PaymentError extends Error {
  constructor(message, code = 'PAYMENT_ERROR', details = {}) {
    super(message);
    this.name = 'PaymentError';
    this.code = code;
    this.details = details;
  }

  toJSON() {
    return {
      message: this.message,
      code: this.code,
      details: this.details,
    };
  }
}

/**
 * Payment Event Emitter
 * Emit payment events for logging and analytics
 */
export const createPaymentEventEmitter = () => {
  const listeners = {};

  return {
    on: (event, callback) => {
      if (!listeners[event]) listeners[event] = [];
      listeners[event].push(callback);
    },

    off: (event, callback) => {
      if (listeners[event]) {
        listeners[event] = listeners[event].filter((cb) => cb !== callback);
      }
    },

    emit: (event, data) => {
      if (listeners[event]) {
        listeners[event].forEach((callback) => callback(data));
      }
    },

    once: (event, callback) => {
      const oneTimeCallback = (data) => {
        callback(data);
        this.off(event, oneTimeCallback);
      };
      this.on(event, oneTimeCallback);
    },
  };
};

/**
 * Mock Payment Service for Testing
 * Remove in production
 */
export class MockPaymentService extends PaymentService {
  async initialize() {
    return true;
  }

  async createPaymentIntent(paymentData) {
    return {
      clientSecret: 'mock_secret_' + Math.random(),
      paymentIntentId: 'mock_intent_' + Date.now(),
    };
  }

  async processPayment(paymentData) {
    return {
      status: PAYMENT_STATUS.SUCCESS,
      transactionId: 'mock_txn_' + Date.now(),
      error: null,
    };
  }

  async getPaymentStatus(paymentId) {
    return {
      status: PAYMENT_STATUS.SUCCESS,
      amount: 100,
      currency: 'USD',
      timestamp: new Date(),
    };
  }

  async refundPayment(paymentId, amount) {
    return {
      success: true,
      refundId: 'mock_refund_' + Date.now(),
      status: PAYMENT_STATUS.SUCCESS,
    };
  }
}
