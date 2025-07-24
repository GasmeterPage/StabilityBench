-- 1. Create a new database
CREATE DATABASE StabilityBenchDB;
GO

-- 2. Use the new database
USE StabilityBenchDB;
GO

-- 3. Create a table for meter details
CREATE TABLE MeterDetails (
    MeterID INT PRIMARY KEY IDENTITY(1,1),
    MeterName NVARCHAR(100),
    Location NVARCHAR(100),
    Value FLOAT,
    Timestamp DATETIME
);
GO

-- 4. Insert sample data
INSERT INTO MeterDetails (MeterName, Location, Value, Timestamp) VALUES
('MeterA', 'Room1', 12.5, GETDATE()),
('MeterB', 'Room2', 15.2, GETDATE()),
('MeterA', 'Room1', 13.1, DATEADD(hour, -1, GETDATE())),
('MeterC', 'Room3', 10.8, GETDATE());
GO

-- 5. Query to get all data
SELECT * FROM MeterDetails;

-- 6. Query to find a specific meter by name
SELECT * FROM MeterDetails WHERE MeterName = 'MeterA';

-- 7. Query to get unique meter names
SELECT DISTINCT MeterName FROM MeterDetails;

-- 8. Example join/merge query (if you have another table)
-- SELECT a.*, b.* FROM MeterDetails a
-- JOIN MeterReadings b ON a.MeterID = b.MeterID;
