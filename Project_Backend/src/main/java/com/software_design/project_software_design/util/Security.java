package com.software_design.project_software_design.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Security {
    public static String encryptPassword(String password) {
        try {
            MessageDigest m = MessageDigest.getInstance("MD5");
            m.update(password.getBytes());
            byte[] bytes = m.digest();
            StringBuilder s = new StringBuilder();
            for (byte b : bytes) {
                s.append(Integer.toString((b & 0xff) + 0x100, 16).substring(1));
            }
            return s.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }
}