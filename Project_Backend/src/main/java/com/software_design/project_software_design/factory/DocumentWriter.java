package com.software_design.project_software_design.factory;

import com.software_design.project_software_design.dto.UserDTO;
import com.software_design.project_software_design.model.Product;

import java.util.List;

public interface DocumentWriter {
    public abstract void writeProductsFile(List<Product> products);
    public abstract void writeUsersFile(List<UserDTO> usersDTO);
}

