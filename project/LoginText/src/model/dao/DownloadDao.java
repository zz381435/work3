package model.dao;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.text.DecimalFormat;
import java.util.ArrayList;

import javax.resource.cci.ResultSet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.vo.Download;

public class DownloadDao extends HttpServlet {

	public ArrayList<Download> query() {
		ArrayList<Download> list = new ArrayList<Download>();
		try {
			// 1.��������
			Class.forName("com.mysql.jdbc.Driver");
			// 2.���������ݿ������
			Connection con = DriverManager
					.getConnection("jdbc:mysql://localhost:3306/user?useUnicode=true&characterEncoding=utf-8&useSSL=false", "root", "123456");
			// 3.�������
			String sql = "select * from t_downloadList ";
			PreparedStatement pst = con.prepareStatement(sql);
			// 4.ִ�����
			java.sql.ResultSet rs = pst.executeQuery();
			// 5.�������
			while (rs.next()) {
				Download download = new Download();
				download.setId(rs.getInt("id"));   // ��Դid
				download.setName(rs.getString("name"));   // ��Դ����
				download.setPath(rs.getString("path"));   // ��Դ������·��
				download.setDescription(rs.getString("description"));   // ��Դ����
				long size=rs.getLong("size");   // ��Դ��С
				String sizeStr=fileSizeTransfer(size);
				download.setSizeStr(sizeStr);
				download.setStar(rs.getInt("star"));   // �Ǽ�
				download.setImage(rs.getString("image"));  // ��Դͼ�������·��
				download.setTime(rs.getString("time"));   // ��Դ�ϴ�ʱ��
				
				list.add(download);  // ���������ڼ�����
			}
			// 6.�ر�����
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	// ������Դid��ѯ��¼�� ����¼ת��Ϊdownload������з���
	public Download get(int id) {
		Download download = null;
		try {
			// 1.��������
			Class.forName("com.mysql.jdbc.Driver");
			// 2.���������ݿ������
			Connection con = DriverManager
					.getConnection("jdbc:mysql://localhost:3306/user?useUnicode=true&characterEncoding=utf-8&useSSL=false", "root", "123456");
			// 3.�������
			String sql = "select * from t_downloadList where id=? ";
			PreparedStatement pst = con.prepareStatement(sql);
			pst.setInt(1, id);
			// 4.ִ�����
			java.sql.ResultSet rs = pst.executeQuery();
			// 5.�������
			while (rs.next()) {
				download = new Download();
				download.setId(rs.getInt("id"));   // ��Դid
				download.setName(rs.getString("name"));   // ��Դ����
				download.setPath(rs.getString("path"));   // ��Դ������·��
				download.setDescription(rs.getString("description"));   // ��Դ����
				long size=rs.getLong("size");   // ��Դ��С
				String sizeStr=fileSizeTransfer(size);
				download.setSizeStr(sizeStr);
				download.setStar(rs.getInt("star"));   // �Ǽ�
				download.setImage(rs.getString("image"));  // ��Դͼ�������·��
				download.setTime(rs.getString("time"));   // ��Դ�ϴ�ʱ��
				download.setSizeStr(sizeStr);
			}
			// 6.�ر�����
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return download; 
		}
	

	public String fileSizeTransfer(long fileSize) {
		String mFileSize;
		DecimalFormat df = new DecimalFormat("######0.00");
		double size = (double) fileSize;
		if (size > 1024 * 1024 * 1024) {
			size = size / (1024 * 1024 * 1024);
			mFileSize = df.format(size) + "G";
		} else if (size > 1024 * 1024) {
			size = size / (1024 * 1024);
			mFileSize = df.format(size) + "MB";
		} else if (size > 1024){
			size = size / 1024;
			mFileSize = df.format(size) + "KB";
		} else {
			mFileSize = df.format(size) + "B";
		}
		return mFileSize;
	}
	
}

