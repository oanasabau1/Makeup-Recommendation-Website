package com.software_design.project_software_design.factory;

import com.software_design.project_software_design.dto.UserDTO;
import com.software_design.project_software_design.model.Product;


import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

public class CSVWriter implements DocumentWriter {

    @Override
    public void writeProductsFile(List<Product> products) {
        String filePath = "makeup_products.csv";
        try (FileWriter fileWriter = new FileWriter(filePath)) {
            fileWriter.write("id,name,description,brand,category\n");
            for (Product product : products) {
                fileWriter.write(product.getProductId() + ",");
                fileWriter.write(product.getName() + ",");
                fileWriter.write(product.getDescription() + ",");
                fileWriter.write(product.getBrand() + ",");
                fileWriter.write(product.getCategory().getCategoryName() + "\n");
            }
            System.out.println("CSV file created successfully.");
        } catch (IOException exception) {
            System.err.println("Error creating CSV file: " + exception.getMessage());
        }
    }

    @Override
    public void writeUsersFile(List<UserDTO> usersDTO) {
        String filePath = "users.csv";
        try (FileWriter fileWriter = new FileWriter(filePath)) {
            fileWriter.write("first_name,last_name,gender,birth_date,email,address,phone_number,role\n");
            for (UserDTO userDTO : usersDTO) {
                fileWriter.write(userDTO.firstName() + ",");
                fileWriter.write(userDTO.lastName() + ",");
                fileWriter.write(userDTO.gender() + ",");
                fileWriter.write(userDTO.birthDate() + ",");
                fileWriter.write(userDTO.email() + ",");
                fileWriter.write(userDTO.address() + ",");
                fileWriter.write(userDTO.phoneNumber() + ",");
                fileWriter.write(userDTO.role().toString() + "\n");
            }
            System.out.println("CSV file created successfully.");
        } catch (IOException exception) {
            System.err.println("Error creating CSV file: " + exception.getMessage());
        }
    }
}
