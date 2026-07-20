-- =====================================================
-- LUMORA DATABASE V2
-- Migration 004
-- Final Production Improvements
-- =====================================================

---------------------------------------------------------
-- COUPONS
---------------------------------------------------------

CREATE TABLE IF NOT EXISTS coupons (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    code TEXT NOT NULL UNIQUE,

    description TEXT,

    discount_type TEXT NOT NULL
        CHECK(discount_type IN ('percentage','fixed')),

    discount_value NUMERIC(10,2) NOT NULL,

    minimum_order NUMERIC(10,2) DEFAULT 0,

    maximum_discount NUMERIC(10,2),

    usage_limit INTEGER,

    used_count INTEGER DEFAULT 0,

    starts_at TIMESTAMPTZ,

    expires_at TIMESTAMPTZ,

    active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    updated_at TIMESTAMPTZ DEFAULT NOW()
);

---------------------------------------------------------
-- COUPON USAGE
---------------------------------------------------------

CREATE TABLE IF NOT EXISTS coupon_usage (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    coupon_id UUID NOT NULL,

    customer_id UUID NOT NULL,

    order_id UUID,

    used_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT coupon_usage_coupon_fk
        FOREIGN KEY(coupon_id)
        REFERENCES coupons(id)
        ON DELETE CASCADE,

    CONSTRAINT coupon_usage_customer_fk
        FOREIGN KEY(customer_id)
        REFERENCES customers(id)
        ON DELETE CASCADE,

    CONSTRAINT coupon_usage_order_fk
        FOREIGN KEY(order_id)
        REFERENCES orders(id)
        ON DELETE SET NULL
);

---------------------------------------------------------
-- INDEXES
---------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_coupon_code
ON coupons(code);

CREATE INDEX IF NOT EXISTS idx_coupon_usage_customer
ON coupon_usage(customer_id);

CREATE INDEX IF NOT EXISTS idx_coupon_usage_coupon
ON coupon_usage(coupon_id);

---------------------------------------------------------
-- PRODUCT SUMMARY VIEW
---------------------------------------------------------

CREATE OR REPLACE VIEW product_summary AS

SELECT

p.id,

p.name,

p.price,

p.stock,

p.status,

c.name AS category,

COUNT(r.id) AS review_count,

COALESCE(ROUND(AVG(r.rating),2),0) AS average_rating

FROM products p

LEFT JOIN categories c
ON p.category_id=c.id

LEFT JOIN reviews r
ON r.product_id=p.id

GROUP BY
p.id,
c.name;

---------------------------------------------------------
-- CUSTOMER SUMMARY VIEW
---------------------------------------------------------

CREATE OR REPLACE VIEW customer_summary AS

SELECT

c.id,

c.full_name,

c.email,

COUNT(o.id) AS orders,

COALESCE(SUM(o.total),0) AS lifetime_value

FROM customers c

LEFT JOIN orders o
ON o.customer_id=c.id

GROUP BY
c.id;

---------------------------------------------------------
-- SALES SUMMARY VIEW
---------------------------------------------------------

CREATE OR REPLACE VIEW sales_summary AS

SELECT

DATE(created_at) AS sale_date,

COUNT(*) AS orders,

SUM(total) AS revenue

FROM orders

GROUP BY DATE(created_at)

ORDER BY sale_date DESC;

---------------------------------------------------------
-- FUNCTION
-- Update customer statistics automatically
---------------------------------------------------------

CREATE OR REPLACE FUNCTION update_customer_stats()

RETURNS TRIGGER

LANGUAGE plpgsql

AS $$

BEGIN

UPDATE customers

SET

total_orders=(

SELECT COUNT(*)

FROM orders

WHERE customer_id=NEW.customer_id
),

total_spent=(

SELECT COALESCE(SUM(total),0)

FROM orders

WHERE customer_id=NEW.customer_id
)

WHERE id=NEW.customer_id;

RETURN NEW;

END;

$$;

---------------------------------------------------------
-- TRIGGER
---------------------------------------------------------

DROP TRIGGER IF EXISTS customer_stats_trigger
ON orders;

CREATE TRIGGER customer_stats_trigger

AFTER INSERT OR UPDATE

ON orders

FOR EACH ROW

WHEN (NEW.customer_id IS NOT NULL)

EXECUTE FUNCTION update_customer_stats();

---------------------------------------------------------
-- FUNCTION
-- Update coupon count
---------------------------------------------------------

CREATE OR REPLACE FUNCTION increment_coupon_usage()

RETURNS TRIGGER

LANGUAGE plpgsql

AS $$

BEGIN

UPDATE coupons

SET used_count=used_count+1

WHERE id=NEW.coupon_id;

RETURN NEW;

END;

$$;

DROP TRIGGER IF EXISTS coupon_usage_trigger
ON coupon_usage;

CREATE TRIGGER coupon_usage_trigger

AFTER INSERT

ON coupon_usage

FOR EACH ROW

EXECUTE FUNCTION increment_coupon_usage();

---------------------------------------------------------
-- UPDATED_AT
---------------------------------------------------------

DROP TRIGGER IF EXISTS update_coupon_updated_at
ON coupons;

CREATE TRIGGER update_coupon_updated_at

BEFORE UPDATE

ON coupons

FOR EACH ROW

EXECUTE FUNCTION update_updated_at_column();