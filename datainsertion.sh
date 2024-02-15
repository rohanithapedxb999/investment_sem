#!/bin/bash

# Read values from credential.txt file
source "$1"

# Set your database connection details
DB_HOST="139.5.190.9"
DB_USER="$database_user_name"
DB_PASSWORD="$password"
DB_NAME="$database_name"

# Function to read user input securely
function read_secure() {
    prompt="$1"
    var_name="$2"
    read -p "$prompt" -s "$var_name"
    echo
}

# Insert data into country table
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" <<EOF
INSERT INTO country (id, name) VALUES (1, '$country');
EOF

# Insert data into state table
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" <<EOF
INSERT INTO state (id, name, country) VALUES (1, '$state', 1);
EOF

# Insert data into city table
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" <<EOF
INSERT INTO city (id, name, state, country) VALUES (1, '$city', 1, 1);
EOF

# Insert data into module table
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" <<EOF
INSERT INTO module (id, name, description) VALUES
(1, 'ADMIN', 'Admin'),
(2, 'ADVISOR', 'Advisor'),
(3, 'TEAM_LEADER', 'Team Lead/Manager');
EOF
# Insert data into feature table
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" <<EOF
INSERT INTO feature (id, name, feature, module) VALUES
(1, 'Location', 'location', 1),
(2, 'Users', 'users', 1),
(3, 'Country', 'country', 1),
(4, 'Products', 'products', 1),
(5, 'Roles', 'roles', 1),
(6, 'City', 'city', 1),
(7, 'My Prospects', 'my_prospects', 2),
(8, 'My Sales', 'my_sales', 2),
(9, 'My AUM', 'my_aum', 2),
(10, 'Occupation', 'occupation', 1),
(11, 'My Clients', 'my_clients', 2),
(12, 'My Prospects', 'my_prospects', 3),
(13, 'My Sales', 'my_sales', 3),
(14, 'My AUM', 'my_aum', 3),
(15, 'My Clients', 'my_clients', 3),
(16, 'Source', 'source', 1);
EOF

# Insert data into role table
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" <<EOF
INSERT INTO role (id, name, module) VALUES
(1, 'ADMIN', 1);
EOF

# Insert data into role_feature table
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" <<EOF
INSERT INTO role_feature (role, feature) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 10),
(1, 16);
EOF
static_password='$2b$10$MolV57RYRMlB4Tx4vk1zkeDtGEuOFXxd.fSgJ1CFSIZwDMkwyRIuG'
# Insert data into user table
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" <<EOF
INSERT INTO user (id, first_name, last_name, email, password, mobileNo, addressLine1, pin, city, state, country)
VALUES (1, '$first_name', '$last_name', '$email', '$static_password', '$mobile_number', '$address', '$pincode', 1, 1, 1);
EOF

# Retrieve the last inserted user ID
user_id=$(mysql -N -s -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" <<< "SELECT LAST_INSERT_ID();")

# Insert data into user_role table
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" <<EOF
INSERT INTO user_role (id, type, role, user) VALUES (1, 'primary', 1, 1);
EOF
