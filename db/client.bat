docker exec -it trips-webapp-mongodb mongosh --host localhost ^
                                    		-u root ^
                                    		-p root ^
                                    		--authenticationDatabase admin ^
                                    		test

