-- Delivery and Shipping Tables for E-Commerce Platform
-- This file contains all tables related to delivery, shipping, and driver management

-- Delivery Zones Table
CREATE TABLE delivery_zones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    polygon JSONB NOT NULL, -- GeoJSON polygon for delivery area
    base_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
    per_km_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
    min_order_amount DECIMAL(10,2) DEFAULT 0,
    max_delivery_time INTEGER DEFAULT 60, -- in minutes
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Drivers Table
CREATE TABLE drivers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    license_number VARCHAR(100) UNIQUE NOT NULL,
    vehicle_type VARCHAR(50) NOT NULL, -- 'car', 'motorcycle', 'bicycle', 'truck'
    vehicle_model VARCHAR(100),
    vehicle_plate VARCHAR(50),
    phone_number VARCHAR(20) NOT NULL,
    emergency_contact VARCHAR(20),
    status VARCHAR(20) DEFAULT 'offline', -- 'offline', 'online', 'busy', 'suspended'
    current_location POINT,
    rating DECIMAL(3,2) DEFAULT 0,
    total_deliveries INTEGER DEFAULT 0,
    completed_deliveries INTEGER DEFAULT 0,
    cancelled_deliveries INTEGER DEFAULT 0,
    earnings_total DECIMAL(10,2) DEFAULT 0,
    earnings_today DECIMAL(10,2) DEFAULT 0,
    is_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    documents JSONB, -- Store document URLs and verification status
    availability_schedule JSONB, -- Weekly schedule
    delivery_zones UUID[] DEFAULT '{}', -- Array of zone IDs driver can serve
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Delivery Requests Table
CREATE TABLE delivery_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
    driver_id UUID REFERENCES drivers(id) ON DELETE SET NULL,
    pickup_address JSONB NOT NULL, -- Full address with coordinates
    delivery_address JSONB NOT NULL, -- Full address with coordinates
    distance_km DECIMAL(8,2),
    estimated_duration INTEGER, -- in minutes
    delivery_fee DECIMAL(10,2) NOT NULL,
    driver_fee DECIMAL(10,2), -- Driver's commission
    platform_fee DECIMAL(10,2), -- Platform's commission
    status VARCHAR(30) DEFAULT 'pending', -- 'pending', 'assigned', 'picked_up', 'in_transit', 'delivered', 'cancelled', 'failed'
    priority INTEGER DEFAULT 0, -- Higher number = higher priority
    scheduled_pickup_time TIMESTAMP WITH TIME ZONE,
    actual_pickup_time TIMESTAMP WITH TIME ZONE,
    estimated_delivery_time TIMESTAMP WITH TIME ZONE,
    actual_delivery_time TIMESTAMP WITH TIME ZONE,
    special_instructions TEXT,
    proof_of_delivery JSONB, -- Photos, signatures, etc.
    cancellation_reason TEXT,
    customer_rating INTEGER CHECK (customer_rating >= 1 AND customer_rating <= 5),
    customer_feedback TEXT,
    driver_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Delivery Tracking Table
CREATE TABLE delivery_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    delivery_request_id UUID REFERENCES delivery_requests(id) ON DELETE CASCADE,
    driver_id UUID REFERENCES drivers(id) ON DELETE CASCADE,
    location POINT NOT NULL,
    status VARCHAR(30) NOT NULL,
    notes TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Driver Earnings Table
CREATE TABLE driver_earnings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID REFERENCES drivers(id) ON DELETE CASCADE,
    delivery_request_id UUID REFERENCES delivery_requests(id) ON DELETE CASCADE,
    base_fee DECIMAL(10,2) NOT NULL,
    distance_fee DECIMAL(10,2) DEFAULT 0,
    time_bonus DECIMAL(10,2) DEFAULT 0,
    tip_amount DECIMAL(10,2) DEFAULT 0,
    total_earning DECIMAL(10,2) NOT NULL,
    platform_commission DECIMAL(10,2) DEFAULT 0,
    net_earning DECIMAL(10,2) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'paid', 'failed'
    payment_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Delivery Feedback Table
CREATE TABLE delivery_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    delivery_request_id UUID REFERENCES delivery_requests(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    driver_id UUID REFERENCES drivers(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,
    delivery_time_rating INTEGER CHECK (delivery_time_rating >= 1 AND delivery_time_rating <= 5),
    driver_behavior_rating INTEGER CHECK (driver_behavior_rating >= 1 AND driver_behavior_rating <= 5),
    food_condition_rating INTEGER CHECK (food_condition_rating >= 1 AND food_condition_rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Shipping Methods Table (for different delivery options)
CREATE TABLE shipping_methods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL, -- 'standard', 'express', 'same_day', 'scheduled'
    base_cost DECIMAL(10,2) NOT NULL,
    per_km_cost DECIMAL(10,2) DEFAULT 0,
    per_item_cost DECIMAL(10,2) DEFAULT 0,
    weight_based_cost DECIMAL(10,2) DEFAULT 0, -- per kg
    min_delivery_time INTEGER NOT NULL, -- in minutes
    max_delivery_time INTEGER NOT NULL, -- in minutes
    max_distance_km DECIMAL(8,2),
    min_order_amount DECIMAL(10,2) DEFAULT 0,
    max_weight_kg DECIMAL(8,2),
    is_active BOOLEAN DEFAULT true,
    availability_schedule JSONB, -- When this method is available
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_drivers_status ON drivers(status);
CREATE INDEX idx_drivers_location ON drivers USING GIST(current_location);
CREATE INDEX idx_drivers_user_id ON drivers(user_id);
CREATE INDEX idx_delivery_requests_status ON delivery_requests(status);
CREATE INDEX idx_delivery_requests_driver_id ON delivery_requests(driver_id);
CREATE INDEX idx_delivery_requests_order_id ON delivery_requests(order_id);
CREATE INDEX idx_delivery_tracking_delivery_request_id ON delivery_tracking(delivery_request_id);
CREATE INDEX idx_delivery_tracking_timestamp ON delivery_tracking(timestamp);
CREATE INDEX idx_driver_earnings_driver_id ON driver_earnings(driver_id);
CREATE INDEX idx_driver_earnings_payment_status ON driver_earnings(payment_status);
CREATE INDEX idx_delivery_zones_active ON delivery_zones(is_active);
CREATE INDEX idx_shipping_methods_store_id ON shipping_methods(store_id);
CREATE INDEX idx_shipping_methods_active ON shipping_methods(is_active);

-- Functions for delivery calculations
CREATE OR REPLACE FUNCTION calculate_delivery_fee(
    pickup_lat DECIMAL,
    pickup_lng DECIMAL,
    delivery_lat DECIMAL,
    delivery_lng DECIMAL,
    zone_id UUID
) RETURNS DECIMAL AS $$
DECLARE
    distance_km DECIMAL;
    zone_base_fee DECIMAL;
    zone_per_km_fee DECIMAL;
    total_fee DECIMAL;
BEGIN
    -- Calculate distance using Haversine formula (simplified)
    distance_km := 6371 * acos(
        cos(radians(pickup_lat)) * cos(radians(delivery_lat)) *
        cos(radians(delivery_lng) - radians(pickup_lng)) +
        sin(radians(pickup_lat)) * sin(radians(delivery_lat))
    );
    
    -- Get zone fees
    SELECT base_fee, per_km_fee INTO zone_base_fee, zone_per_km_fee
    FROM delivery_zones WHERE id = zone_id AND is_active = true;
    
    -- Calculate total fee
    total_fee := COALESCE(zone_base_fee, 0) + (distance_km * COALESCE(zone_per_km_fee, 0));
    
    RETURN total_fee;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update driver ratings
CREATE OR REPLACE FUNCTION update_driver_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE drivers 
    SET rating = (
        SELECT AVG(rating::DECIMAL) 
        FROM delivery_feedback 
        WHERE driver_id = NEW.driver_id
    ),
    updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.driver_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_driver_rating
    AFTER INSERT ON delivery_feedback
    FOR EACH ROW
    EXECUTE FUNCTION update_driver_rating();

-- Insert sample delivery zones
INSERT INTO delivery_zones (name, description, polygon, base_fee, per_km_fee, min_order_amount) VALUES
('Central Riyadh', 'Central business district and surrounding areas', 
 '{"type":"Polygon","coordinates":[[[46.6753,24.7136],[46.7753,24.7136],[46.7753,24.8136],[46.6753,24.8136],[46.6753,24.7136]]]}',
 10.00, 2.50, 25.00),
('North Riyadh', 'Northern residential areas',
 '{"type":"Polygon","coordinates":[[[46.6753,24.8136],[46.7753,24.8136],[46.7753,24.9136],[46.6753,24.9136],[46.6753,24.8136]]]}',
 15.00, 3.00, 30.00),
('Jeddah Central', 'Central Jeddah delivery zone',
 '{"type":"Polygon","coordinates":[[[39.1579,21.4891],[39.2579,21.4891],[39.2579,21.5891],[39.1579,21.5891],[39.1579,21.4891]]]}',
 12.00, 2.75, 30.00);

-- Note: Sample shipping methods will be inserted after stores are created
-- This can be done in the main schema file or through the application
