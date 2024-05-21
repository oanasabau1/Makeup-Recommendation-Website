package com.software_design.project_software_design.factory;

public class CSVFactory implements DocumentFactory{
    @Override
    public DocumentWriter factoryMethod() {
        return new CSVWriter();
    }
}
