-- ============================================================================
-- Seed data for BSS — categories, services, testimonials, partners, settings.
-- Products are seeded from the application data module; this provides a
-- minimal backend seed for categories and services.
-- ============================================================================

insert into categories (name, slug, description, icon) values
  ('Fire Extinguishers','fire-extinguishers','CO₂, DCP, Foam and Water extinguishers in all sizes','flame'),
  ('CCTV Cameras','cctv-cameras','Dome, Bullet and PTZ surveillance cameras','cctv'),
  ('DVR / NVR Systems','recorders','Network and digital video recorders','hard-drive'),
  ('Fire Alarm & Detection','fire-alarm','Smoke detectors and fire alarm panels','bell-ring'),
  ('Access Control','access-control','Biometric, card and PIN access systems','fingerprint'),
  ('Security Accessories','accessories','Emergency lights, blankets and accessories','shield')
on conflict (slug) do nothing;

insert into services (name, slug, short_description, description, icon, starting_price, featured) values
  ('Fire Extinguisher Refilling','fire-extinguisher-refilling','Certified refilling and pressure testing.','On-site and workshop refilling with certification.','flame',800,true),
  ('CCTV Installation','cctv-installation','End-to-end survey, supply and installation.','Professional CCTV design and installation.','cctv',5000,true),
  ('Fire Alarm Installation','fire-alarm-installation','Addressable & conventional fire alarms.','EN54-compliant fire alarm systems.','bell-ring',15000,true),
  ('Complete Bank Security Solutions','complete-bank-security-solutions','Turnkey SBP-compliant bank security.','Vault & ATM surveillance, panic alarms, monitoring.','landmark',150000,true),
  ('Annual Maintenance Contracts','annual-maintenance-contracts','Scheduled preventive maintenance.','Priority response and discounted parts.','calendar-check',30000,false),
  ('Fire Safety Inspections','fire-safety-inspections','Certified inspections & compliance.','Detailed inspections with compliance reports.','search-check',10000,false)
on conflict (slug) do nothing;

insert into testimonials (name, company, role, quote, rating) values
  ('Imran Baloch','National Bank — Quetta Region','Regional Security Manager','BSS delivered a fully SBP-compliant security upgrade across 12 branches on schedule.',5),
  ('Dr. Saima Khan','Bolan Medical Complex','Administration Head','The fire alarm and detection system gives us complete peace of mind.',5),
  ('Tariq Mehmood','Gadani Industrial Estate','Plant Manager','Their industrial fire protection and CCTV coverage is top-tier.',4);

insert into partners (name, logo) values
  ('Hikvision','Hikvision'),('Dahua','Dahua'),('Honeywell','Honeywell'),
  ('Bosch','Bosch'),('ZKTeco','ZKTeco'),('Notifier','Notifier');

insert into settings (key, value) values
  ('site', '{"name":"Balochistan Standard Services","email":"info@bss.com.pk","phone":"+92 300 1234567","whatsapp":"923001234567"}')
on conflict (key) do nothing;
