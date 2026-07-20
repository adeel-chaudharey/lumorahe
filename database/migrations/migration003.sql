-- =====================================================
-- LUMORA DATABASE V2
-- Migration 003
-- Product Images / Inventory / Reviews /
-- Wishlist / Cart
-- =====================================================

---------------------------------------------------------
-- PRODUCT IMAGES
---------------------------------------------------------

CREATE TABLE IF NOT EXISTS product_images (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    product_id UUID NOT NULL,

    image_url TEXT NOT NULL,

    alt_text TEXT,

    sort_order INTEGER DEFAULT 0,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT product_images_product_fk
        FOREIGN KEY(product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

---------------------------------------------------------
-- INVENTORY LOGS
---------------------------------------------------------

CREATE TABLE IF NOT EXISTS inventory_logs (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    product_id UUID NOT NULL,

    quantity_change INTEGER NOT NULL,

    previous_stock INTEGER NOT NULL,

    new_stock INTEGER NOT NULL,

    reason TEXT NOT NULL,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT inventory_logs_product_fk
        FOREIGN KEY(product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

---------------------------------------------------------
-- REVIEWS
---------------------------------------------------------

CREATE TABLE IF NOT EXISTS reviews (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    customer_id UUID NOT NULL,

    product_id UUID NOT NULL,

    rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),

    title TEXT,

    comment TEXT,

    is_verified_purchase BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT reviews_customer_fk
        FOREIGN KEY(customer_id)
        REFERENCES customers(id)
        ON DELETE CASCADE,

    CONSTRAINT reviews_product_fk
        FOREIGN KEY(product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

---------------------------------------------------------
-- WISHLIST
---------------------------------------------------------

CREATE TABLE IF NOT EXISTS wishlist (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    customer_id UUID NOT NULL,

    product_id UUID NOT NULL,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT wishlist_customer_fk
        FOREIGN KEY(customer_id)
        REFERENCES customers(id)
        ON DELETE CASCADE,

    CONSTRAINT wishlist_product_fk
        FOREIGN KEY(product_id)
        REFERENCES products(id)
        ON DELETE CASCADE,

    CONSTRAINT wishlist_unique
        UNIQUE(customer_id, product_id)
);

---------------------------------------------------------
-- CART ITEMS
---------------------------------------------------------

CREATE TABLE IF NOT EXISTS cart_items (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    customer_id UUID NOT NULL,

    product_id UUID NOT NULL,

    quantity INTEGER NOT NULL DEFAULT 1 CHECK(quantity > 0),

    created_at TIMESTAMPTZ DEFAULT NOW(),

    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT cart_customer_fk
        FOREIGN KEY(customer_id)
        REFERENCES customers(id)
        ON DELETE CASCADE,

    CONSTRAINT cart_product_fk
        FOREIGN KEY(product_id)
        REFERENCES products(id)
        ON DELETE CASCADE,

    CONSTRAINT cart_unique
        UNIQUE(customer_id, product_id)
);

---------------------------------------------------------
-- INDEXES
---------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_product_images_product
ON product_images(product_id);

CREATE INDEX IF NOT EXISTS idx_inventory_logs_product
ON inventory_logs(product_id);

CREATE INDEX IF NOT EXISTS idx_reviews_product
ON reviews(product_id);

CREATE INDEX IF NOT EXISTS idx_reviews_customer
ON reviews(customer_id);

CREATE INDEX IF NOT EXISTS idx_cart_customer
ON cart_items(customer_id);

CREATE INDEX IF NOT EXISTS idx_wishlist_customer
ON wishlist(customer_id);

---------------------------------------------------------
-- UPDATED_AT TRIGGERS
---------------------------------------------------------

DROP TRIGGER IF EXISTS update_reviews_updated_at
ON reviews;

CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE
ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_cart_updated_at
ON cart_items;

CREATE TRIGGER update_cart_updated_at
BEFORE UPDATE
ON cart_items
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();