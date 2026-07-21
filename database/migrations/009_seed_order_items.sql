INSERT INTO order_items (
    order_id,
    product_id,
    product_name,
    sku,
    quantity,
    unit_price,
    subtotal
)

SELECT
    o.id,
    p.id,
    p.name,
    p.sku,
    1,
    p.price,
    p.price
FROM orders o
CROSS JOIN LATERAL (
    SELECT *
    FROM products
    ORDER BY random()
    LIMIT 1
) p;