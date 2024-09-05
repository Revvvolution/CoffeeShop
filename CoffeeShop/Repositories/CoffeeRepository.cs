using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using CoffeeShop.Models;

namespace CoffeeShop.Repositories
{
    public class CoffeeRepository : ICoffeeRepository
    {
        private readonly string _connectionString;
        public CoffeeRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }


        private SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }

        public List<Coffee> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT c.Id, c.Title, c.BeanVarietyId, bv.Id AS 'BV Id', bv.[Name] AS 'Bean Variety Name', bv.Region, bv.[Notes]
                                        FROM Coffee c
                                        LEFT OUTER JOIN BeanVariety bv
                                        ON c.BeanVarietyId = bv.Id
                    ;";

                    var reader = cmd.ExecuteReader();
                    var coffeeList = new List<Coffee>();
                    while (reader.Read())
                    {
                        var coffee = new Coffee()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            BeanVarietyId = reader.GetInt32(reader.GetOrdinal("BeanVarietyId")),
                            BeanVariety = new BeanVariety
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("BV Id")),
                                Name = reader.GetString(reader.GetOrdinal("Bean Variety Name")),
                                Region = reader.GetString(reader.GetOrdinal("Region")),
                                Notes = reader.IsDBNull(reader.GetOrdinal("Notes")) ? null :
                                        reader.GetString(reader.GetOrdinal("Notes")),
                            }
                        };
                        coffeeList.Add(coffee);
                    }

                    reader.Close();

                    return coffeeList;
                }
            }
        }

        public Coffee Get(int id)
        {
            return null;
        }

        public void Add(Coffee coffee)
        {
            return;
        }

        public void Update(Coffee coffee)
        {
            return;
        }

        public void Delete(int id)
        {
            return;
        }


    }
}
