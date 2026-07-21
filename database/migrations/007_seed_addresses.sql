INSERT INTO addresses (
    customer_id,
    full_name,
    phone,
    address_line1,
    address_line2,
    city,
    state,
    postal_code,
    country,
    is_default
)
SELECT
    id,
    full_name,
    phone,
    '742 Main Street',
    'Apartment 1',
    'New York',
    'NY',
    '10001',
    'USA',
    true
FROM customers
WHERE email = 'john@example.com'

UNION ALL

SELECT
    id,
    full_name,
    phone,
    '15 Sunset Blvd',
    'Suite 201',
    'Los Angeles',
    'CA',
    '90001',
    'USA',
    true
FROM customers
WHERE email = 'emma@example.com'

UNION ALL

SELECT
    id,
    full_name,
    phone,
    '220 Lake View',
    '',
    'Chicago',
    'IL',
    '60601',
    'USA',
    true
FROM customers
WHERE email = 'michael@example.com'

UNION ALL

SELECT
    id,
    full_name,
    phone,
    '98 Green Avenue',
    '',
    'Houston',
    'TX',
    '77001',
    'USA',
    true
FROM customers
WHERE email = 'olivia@example.com'

UNION ALL

SELECT
    id,
    full_name,
    phone,
    '51 River Road',
    '',
    'Seattle',
    'WA',
    '98101',
    'USA',
    true
FROM customers
WHERE email = 'william@example.com';