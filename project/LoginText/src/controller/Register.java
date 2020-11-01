package controller;

import com.google.gson.Gson;
import dao.IUserDAO;
import dbc.DatabaseConnection;
import factory.DAOFactory;
import vo.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

/**
 * �û�ע�ᣬ��Ҫ������֤����
 */
@WebServlet("register.do")
public class Register extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        //1. �ַ�����
        request.setCharacterEncoding("utf-8");
        //2.������������
        String username=request.getParameter("userName");
        String realName=request.getParameter("realName");
        String email=request.getParameter("email");
        String province=request.getParameter("province");
        String city=request.getParameter("city");
        String password=request.getParameter("password");
        String chrName=request.getParameter("chrName");
        String role=request.getParameter("role");
        Map<String, Object> map = new HashMap<String, Object>();

        // ���ݿ����
        User user = new User(username, realName, email, province,
                city, password, chrName, role);
        Connection con = new DatabaseConnection().getConnection();
        IUserDAO iUserDAOInstance = DAOFactory.getIUserDAOInstance(con);
        boolean isInsertSuccess = false;
        try {
            isInsertSuccess = iUserDAOInstance.insert(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
        if(isInsertSuccess){
            map.put("code", 0);
            map.put("info", "ע��ɹ�");
        }
        else {
            map.put("code", 1);
            map.put("info", "ע��ʧ��");
        }
        String jsonStr = new Gson().toJson(map);
        response.setContentType("text/json;charset=uft-8");
        PrintWriter out = response.getWriter();
        out.print(jsonStr);
        out.flush();
        out.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
