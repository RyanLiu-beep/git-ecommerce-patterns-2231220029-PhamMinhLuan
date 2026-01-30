// The Invoker class
class CommandInvoker {
    constructor() {
        this.history = [];
    }

    executeCommand(command) {
        command.execute();
        this.history.push(command);
    }

    undoLastCommand() {
        const command = this.history.pop();
        if (command) {
            command.undo();
        }
    }
}

// The Command interface (conceptual in JS)
class Command {
    execute() {
        throw new Error("Execute method must be implemented.");
    }
    undo() {
        throw new Error("Undo method must be implemented.");
    }
}

// Concrete Command for adding a product to the cart
class AddToCartCommand extends Command {
    constructor(cartService, product) {
        super();
        this.cartService = cartService;
        this.product = product;
    }

    execute() {
        this.cartService.addProduct(this.product);
        console.log(`[Command] Added ${this.product.name} to cart.`);
    }

    undo() {
        this.cartService.removeProduct(this.product.id);
        console.log(`[Command] Undid addition of ${this.product.name} to cart.`);
    }
}

export { CommandInvoker, AddToCartCommand };
