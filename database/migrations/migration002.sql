-- =====================================================
-- LUMORA DATABASE V2
-- Migration 002
-- Orders / Addresses / Payments
-- =====================================================

---------------------------------------------------------
-- ADDRESSES
---------------------------------------------------------

CREATE TABLE IF NOT EXISTS addresses (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    customer_id UUID NOT NULL,

    full_name TEXT NOT NULL,

    phone TEXT,

    address_line1 TEXT NOT NULL,

    address_line2 TEXT,

    city TEXT NOT NULL,

    state TEXT,

    postal_code TEXT,

    country TEXT NOT NULL,

    is_default BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT addresses_customer_fk
        FOREIGN KEY(customer_id)
        REFERENCES customers(id)
        ON DELETE CASCADE
);

---------------------------------------------------------
-- ORDER ITEMS
---------------------------------------------------------

CREATE TABLE IF NOT EXISTS order_items (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    order_id UUID NOT NULL,

    product_id UUID NOT NULL,

    product_name TEXT NOT NULL,

    sku TEXT,

    quantity INTEGER NOT NULL CHECK(quantity > 0),

    unit_price NUMERIC(10,2) NOT NULL CHECK(unit_price >= 0),

    subtotal NUMERIC(10,2) NOT NULL CHECK(subtotal >= 0),

    created_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT order_items_order_fk
        FOREIGN KEY(order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    CONSTRAINT order_items_product_fk
        FOREIGN KEY(product_id)
        REFERENCES products(id)
        ON DELETE RESTRICT
);

---------------------------------------------------------
-- PAYMENTS
---------------------------------------------------------

CREATE TABLE IF NOT EXISTS payments (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    order_id UUID NOT NULL,

    provider TEXT NOT NULL DEFAULT 'stripe',

    transaction_id TEXT,

    payment_intent TEXT,

    amount NUMERIC(10,2) NOT NULL CHECK(amount >= 0),

    currency TEXT DEFAULT 'USD',

    status TEXT DEFAULT 'Pending',

    paid_at TIMESTAMPTZ,

    failure_reason TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT payments_order_fk
        FOREIGN KEY(order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE
);

---------------------------------------------------------
-- INDEXES
---------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_addresses_customer
ON addresses(customer_id);

CREATE INDEX IF NOT EXISTS idx_order_items_order
ON order_items(order_id);

CREATE INDEX IF NOT EXISTS idx_order_items_product
ON order_items(product_id);

CREATE INDEX IF NOT EXISTS idx_payments_order
ON payments(order_id);

CREATE INDEX IF NOT EXISTS idx_payments_status
ON payments(status);

CREATE INDEX IF NOT EXISTS idx_payments_provider
ON payments(provider);

---------------------------------------------------------
-- UPDATED_AT TRIGGERS
---------------------------------------------------------

DROP TRIGGER IF EXISTS update_addresses_updated_at
ON addresses;

CREATE TRIGGER update_addresses_updated_at
BEFORE UPDATE
ON addresses
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_payments_updated_at
ON payments;

CREATE TRIGGER update_payments_updated_at
BEFORE UPDATE
ON payments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();