package com.software_design.project_software_design.factory;

import com.software_design.project_software_design.dto.UserDTO;
import com.software_design.project_software_design.model.Product;

import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

public class XMLWriter implements DocumentWriter {

    @Override
    public void writeProductsFile(List<Product> products) {
        String filePath = "makeup_products.xml";
        try (FileWriter writer = new FileWriter(filePath)) {
            writer.write("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
            writer.write("<data>\n");
            for (Product product : products) {
                writer.write("  <object>\n    <productId>" + product.getProductId() + "</productId>\n    " +
                        "<name>" + product.getName() + "</name>\n    " +
                        "<description>" + product.getDescription() + "</description>\n    " +
                        "<brand>" + product.getBrand() + "</brand>\n    " +
                        "<category>" + product.getCategory().getCategoryName() + "</category>\n" +
                        "  </object>\n");
            }
            writer.write("</data>");
            System.out.println("XML file created successfully.");
        } catch (IOException exception) {
            System.err.println("Error writing XML file: " + exception.getMessage());
        }
    }

    @Override
    public void writeUsersFile(List<UserDTO> usersDTO) {
        String filePath = "users.xml";
        try (FileWriter writer = new FileWriter(filePath)) {
            writer.write("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
            writer.write("<data>\n");
            for (UserDTO userDTO : usersDTO) {
                writer.write("  <object>\n    <first_name>" + userDTO.firstName() + "</first_name>\n    " +
                        "<last_name>" + userDTO.lastName() + "</last_name>\n    " +
                        "<gender>" + userDTO.gender() + "</gender>\n    " +
                        "<birth_date>" + userDTO.birthDate() + "</birth_date>\n    " +
                        "<email>" + userDTO.email() + "</email>\n    " +
                        "<address>" + userDTO.address() + "</address>\n    " +
                        "<phone_number>" + userDTO.phoneNumber() + "</phone_number>\n    " +
                        "<role>" + userDTO.role().toString() + "</role>\n" +
                        "  </object>\n");
            }
            writer.write("</data>");
            System.out.println("XML file created successfully.");
        } catch (IOException exception) {
            System.err.println("Error writing XML file: " + exception.getMessage());
        }
    }
}
