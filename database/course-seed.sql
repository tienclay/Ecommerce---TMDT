-- Insert sample locations
INSERT INTO locations (address_line1, address_line2, city, state, zip_code, country)
VALUES
    ('123 Main Street', NULL, 'New York', 'NY', '10001', 'USA'),
    ('456 Elm Avenue', 'Suite 5B', 'Los Angeles', 'CA', '90001', 'USA'),
    ('789 Pine Road', NULL, 'Chicago', 'IL', '60601', 'USA');

select * from locations l 

-- Insert sample courses
INSERT INTO courses (name, subject, duration, location_id, description)
VALUES
    ('Beginner English Course', 'English Language', '10 weeks', '8fe84940-2268-4ea8-97a1-f06b321cbc2c', 'An introductory course to English language for beginners.'),
    ('Intermediate English Course', 'English Language', '12 weeks', '8fe84940-2268-4ea8-97a1-f06b321cbc2c', 'For students who have basic knowledge of English and want to improve.'),
    ('Advanced English Course', 'English Language', '14 weeks', 'e2c745c3-a75f-4eb8-9901-63cfc04aad61', 'Advanced level English course focusing on fluency and proficiency.'),
    ('Business English Course', 'English Language', '8 weeks', 'e2c745c3-a75f-4eb8-9901-63cfc04aad61', 'English course tailored for business professionals.'),
    ('English Conversation Course', 'English Language', '6 weeks', '84e87356-228d-4084-99f7-378ece2bb189', 'Focus on improving conversational English skills.');
   
   select * from courses
   
   -- Insert sample course fees
INSERT INTO course_fees (fee_amount, fee_type, description, course_id)
VALUES
    (5000000, 'One-time', 'Course enrollment fee', 'da6fe068-f309-48b0-bf83-6f0db8f3867d'),
    (6000000, 'One-time', 'Course enrollment fee', '94e9cd22-e86d-47f5-832e-ab794916fab2'),
    (7000000, 'One-time', 'Course enrollment fee', 'f845aa89-e40a-4f31-879f-e1bcbefeff23'),
    (4000000, 'One-time', 'Course enrollment fee', '47c5b6b1-47c5-4704-89aa-b129e52ccd38'),
    (3000000, 'One-time', 'Course enrollment fee', '564781d5-1ba7-4e0f-bea7-a48d2884e046');

  select * from course_fees cf 
  
