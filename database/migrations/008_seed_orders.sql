INSERT INTO orders (
    customer_id,
    customer_name,
    customer_email,
    subtotal,
    tax,
    shipping,
    discount,
    total,
    status,
    payment_status,
    fulfillment_status,
    created_at
)

SELECT
    id,
    full_name,
    email,
    120,
    12,
    10,
    0,
    142,
    'Delivered',
    'Paid',
    'Fulfilled',
    NOW() - INTERVAL '15 days'
FROM customers
WHERE email='john@example.com'

UNION ALL

SELECT
    id,
    full_name,
    email,
    340,
    34,
    15,
    20,
    369,
    'Delivered',
    'Paid',
    'Fulfilled',
    NOW() - INTERVAL '10 days'
FROM customers
WHERE email='emma@example.com'

UNION ALL

SELECT
    id,
    full_name,
    email,
    89,
    9,
    8,
    0,
    106,
    'Pending',
    'Pending',
    'Unfulfilled',
    NOW() - INTERVAL '3 days'
FROM customers
WHERE email='michael@example.com'

UNION ALL

SELECT
    id,
    full_name,
    email,
    560,
    56,
    20,
    30,
    606,
    'Delivered',
    'Paid',
    'Fulfilled',
    NOW() - INTERVAL '7 days'
FROM customers
WHERE email='olivia@example.com'

UNION ALL

SELECT
    id,
    full_name,
    email,
    75,
    7.5,
    5,
    0,
    87.5,
    'Processing',
    'Paid',
    'Processing',
    NOW() - INTERVAL '1 day'
FROM customers
WHERE email='william@example.com';