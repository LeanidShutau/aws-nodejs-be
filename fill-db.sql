delete from stocks;
delete from products;

insert
	into
	products ( id, title, description, price, image)
values ( '5ecff64a-16c4-4f04-a68b-9dbd9f84dd7e', 'Canned air from Paris', 'Canned air from Paris', 14, 'https://i.etsystatic.com/6020270/r/il/48e8c7/2400885419/il_794xN.2400885419_jsos.jpg' ),
( 'e71a9424-2a97-47f5-8a16-ee965ca41ca1', 'Canned air from New York City', 'Canned air from New York City', 20, 'https://images-na.ssl-images-amazon.com/images/I/51xedEjDK4L._AC_SL1024_.jpg' ),
( 'd53e1c0e-96f2-48e0-a23f-5ca65e1817b8', 'Canned air from Sydney', 'Canned air from Sydney', 18, 'https://i.etsystatic.com/6020270/r/il/48d3bf/536492284/il_570xN.536492284_r6dh.jpg' ),
( 'eb3ca9fb-09e0-4265-a0b1-f0989dd7cd60', 'Canned air from Honolulu', 'Canned air from Honolulu', 29, 'https://images-na.ssl-images-amazon.com/images/I/61QoO5ddWlL._AC_SY741_.jpg' ),
( '1e36a0f9-7e37-41f9-9c28-a2d6990ae09e', 'Canned air from Singapore', 'Canned air from Singapore', 33, 'https://i.etsystatic.com/6020270/r/il/577b1d/334450474/il_300x300.334450474.jpg' );

insert
	into
	stocks ( product_id , count)
values ( '5ecff64a-16c4-4f04-a68b-9dbd9f84dd7e', 10 ),
( 'e71a9424-2a97-47f5-8a16-ee965ca41ca1', 2 ),
( 'd53e1c0e-96f2-48e0-a23f-5ca65e1817b8', 1 ),
( 'eb3ca9fb-09e0-4265-a0b1-f0989dd7cd60', 5 ),
( '1e36a0f9-7e37-41f9-9c28-a2d6990ae09e', 5 );
