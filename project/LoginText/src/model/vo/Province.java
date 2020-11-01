package model.vo;

import javax.servlet.http.HttpServlet;

public class Province extends HttpServlet {
	private String provinceCode;
    private String name;

    public String getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(String provinceCode) {
        this.provinceCode = provinceCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Province(String provinceCode, String name) {
        this.provinceCode = provinceCode;
        this.name = name;
    }

    @Override
    public String toString() {
        return "Province{" +
                "provinceCode='" + provinceCode + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
