-- =====================================================
-- LUMORA DATABASE V2
-- Migration 001
-- Upgrade Existing Tables
-- =====================================================

---------------------------------------------------------
-- EXTENSIONS
---------------------------------------------------------

CREATE EXTENSION IF NOT EXISTS pgcrypto;

---------------------------------------------------------
-- PRODUCTS
---------------------------------------------------------

ALTER TABLE products
ADD COLUMN IF NOT EXISTS cost_price NUMERIC(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS barcode TEXT,
ADD COLUMN IF NOT EXISTS tax_rate NUMERIC(5,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_digital BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS meta_keywords TEXT;

---------------------------------------------------------
-- CUSTOMERS
---------------------------------------------------------

ALTER TABLE customers
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS loyalty_points INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_login TIMESTAMPTZ;

---------------------------------------------------------
-- ORDERS
---------------------------------------------------------

ALTER TABLE orders

ADD COLUMN IF NOT EXISTS customer_id UUID,

ADD COLUMN IF NOT EXISTS subtotal NUMERIC(10,2) DEFAULT 0,

ADD COLUMN IF NOT EXISTS tax NUMERIC(10,2) DEFAULT 0,

ADD COLUMN IF NOT EXISTS shipping NUMERIC(10,2) DEFAULT 0,

ADD COLUMN IF NOT EXISTS discount NUMERIC(10,2) DEFAULT 0,

ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'Pending',

ADD COLUMN IF NOT EXISTS fulfillment_status TEXT DEFAULT 'Unfulfilled',

ADD COLUMN IF NOT EXISTS tracking_number TEXT,

ADD COLUMN IF NOT EXISTS notes TEXT,

ADD COLUMN IF NOT EXISTS stripe_payment_intent TEXT;

---------------------------------------------------------
-- CATEGORIES
---------------------------------------------------------

ALTER TABLE categories
ADD COLUMN IF NOT EXISTS seo_title TEXT,
ADD COLUMN IF NOT EXISTS seo_description TEXT;

---------------------------------------------------------
-- FOREIGN KEY
---------------------------------------------------------

ALTER TABLE orders
DROP CONSTRAINT IF EXISTS orders_customer_id_fkey;

ALTER TABLE orders
ADD CONSTRAINT orders_customer_id_fkey
FOREIGN KEY (customer_id)
REFERENCES customers(id)
ON DELETE SET NULL;

---------------------------------------------------------
-- UNIQUE CONSTRAINTS
---------------------------------------------------------

ALTER TABLE categories
ADD CONSTRAINT categories_slug_unique UNIQUE(slug);

ALTER TABLE products
ADD CONSTRAINT products_slug_unique UNIQUE(slug);

ALTER TABLE products
ADD CONSTRAINT products_sku_unique UNIQUE(sku);

ALTER TABLE customers
ADD CONSTRAINT customers_email_unique UNIQUE(email);

---------------------------------------------------------
-- CHECK CONSTRAINTS
---------------------------------------------------------

ALTER TABLE products
ADD CONSTRAINT positive_price
CHECK(price >= 0);

ALTER TABLE products
ADD CONSTRAINT positive_stock
CHECK(stock >= 0);

ALTER TABLE orders
ADD CONSTRAINT positive_total
CHECK(total >= 0);

---------------------------------------------------------
-- INDEXES
---------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_products_category
ON products(category_id);

CREATE INDEX IF NOT EXISTS idx_products_featured
ON products(featured);

CREATE INDEX IF NOT EXISTS idx_products_status
ON products(status);

CREATE INDEX IF NOT EXISTS idx_orders_status
ON orders(status);

CREATE INDEX IF NOT EXISTS idx_orders_customer
ON orders(customer_id);

CREATE INDEX IF NOT EXISTS idx_customers_email
ON customers(email);

CREATE INDEX IF NOT EXISTS idx_categories_slug
ON categories(slug);

CREATE INDEX IF NOT EXISTS idx_products_slug
ON products(slug);

---------------------------------------------------------
-- UPDATED_AT TRIGGER
---------------------------------------------------------

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_products_updated_at
ON products;

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE
ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_categories_updated_at
ON categories;

CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE
ON categories
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_customers_updated_at
ON customers;

CREATE TRIGGER update_customers_updated_at
BEFORE UPDATE
ON customers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at
ON orders;

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE
ON orders
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();