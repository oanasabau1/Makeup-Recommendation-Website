package com.software_design.project_software_design.factory;

import com.software_design.project_software_design.dto.UserDTO;
import com.software_design.project_software_design.model.Product;

import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

public class JSONWriter implements DocumentWriter {

    @Override
    public void writeProductsFile(List<Product> products) {
        String filePath = "makeup_products.json";
        try (FileWriter fileWriter = new FileWriter(filePath)) {
            fileWriter.write("[\n");
            for (int i = 0; i < products.size(); i++) {
                Product product = products.get(i);
                fileWriter.write("  {\n");
                fileWriter.write("    \"productId\": \"" + product.getProductId() + "\",\n");
                fileWriter.write("    \"name\": \"" + product.getName() + "\",\n");
                fileWriter.write("    \"description\": \"" + product.getDescription() + "\",\n");
                fileWriter.write("    \"brand\": \"" + product.getBrand() + "\",\n");
                fileWriter.write("    \"category\": \"" + product.getCategory().getCategoryName() + "\"\n");
                fileWriter.write("  }");
                if (i != products.size() - 1) {
                    fileWriter.write(",\n");
                } else {
                    fileWriter.write("\n");
                }
            }
            fileWriter.write("]\n");
            System.out.println("JSON file created successfully!");
        } catch (IOException exception) {
            System.err.println("Error creating JSON file: " + exception.getMessage());
        }
    }

    @Override
    public void writeUsersFile(List<UserDTO> usersDTO) {
        String filePath = "users.json";
        try (FileWriter fileWriter = new FileWriter(filePath)) {
            fileWriter.write("[\n");
            for (int i = 0; i < usersDTO.size(); i++) {
                UserDTO userDTO = usersDTO.get(i);
                fileWriter.write("  {\n");
                fileWriter.write("    \"first_name\": \"" + userDTO.firstName() + "\",\n");
                fileWriter.write("    \"last_name\": \"" + userDTO.lastName() + "\",\n");
                fileWriter.write("    \"gender\": \"" + userDTO.gender() + "\",\n");
                fileWriter.write("    \"birth_date\": \"" + userDTO.birthDate() + "\",\n");
                fileWriter.write("    \"email\": \"" + userDTO.email() + "\",\n");
                fileWriter.write("    \"address\": \"" + userDTO.address() + "\",\n");
                fileWriter.write("    \"phone_number\": \"" + userDTO.phoneNumber() + "\",\n");
                fileWriter.write("    \"role\": \"" + userDTO.role().toString() + "\"\n");
                fileWriter.write("  }");
                if (i != usersDTO.size() - 1) {
                    fileWriter.write(",\n");
                } else {
                    fileWriter.write("\n");
                }
            }
            fileWriter.write("]\n");
            System.out.println("JSON file created successfully!");
        } catch (IOException exception) {
            System.err.println("Error creating JSON file: " + exception.getMessage());
        }
    }
}
