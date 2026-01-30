import { InventoryService } from '../../services/InventoryService.js';
import { PaymentService } from '../../services/PaymentService.js';
import { ShippingService } from '../../services/ShippingService.js';

class CheckoutFacade {
    constructor() {
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.shippingService = new ShippingService();
    }

    placeOrder(orderDetails) {
        console.log("Starting checkout process...");

        // 1. Check Stock
        const stockOk = this.inventoryService.checkStock(orderDetails.productIds);
        if (!stockOk) {
            console.log("Stock check failed. Order cancelled.");
            return;
        }

        // 2. Process Payment
        // Assuming a fixed amount for this simplified facade example since we don't have the cart passed here.
        // In a real scenario, we would calculate total from productIds or pass the cart.
        const amount = 200;
        const paymentOk = this.paymentService.processPayment(orderDetails.userId, amount);
        if (!paymentOk) {
            console.log("Payment failed. Order cancelled.");
            return;
        }

        // 3. Arrange Shipping
        const shippingResult = this.shippingService.arrangeShipping(orderDetails.userId, orderDetails.shippingInfo);
        console.log(`Order placed successfully! Tracking ID: ${shippingResult.trackingId}`);
    }
}

export { CheckoutFacade };
