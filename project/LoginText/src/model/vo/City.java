package model.vo;

import javax.servlet.http.HttpServlet;

public class City extends HttpServlet {
	private String provinceCode;
    private String name;

    public City(String name, String provinceCode) {
        this.name = name;
        this.provinceCode = provinceCode;
    }

    public City() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(String provinceCode) {
        this.provinceCode = provinceCode;
    }

    @Override
    public String toString() {
        return "City{" +
                "name='" + name + '\'' +
                ", provinceCode='" + provinceCode + '\'' +
                '}';
    }
}
