package com.software_design.project_software_design.factory;

public class JSONFactory implements DocumentFactory{
    @Override
    public DocumentWriter factoryMethod() {
        return new JSONWriter();
    }
}
