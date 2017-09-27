<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.net.URL" %>
<%@ page import="java.net.URLConnection" %>
<%@ page import="java.io.*" %>
<%@ page import="java.util.zip.GZIPInputStream" %>
<%@ page import="java.net.URLEncoder" %>
<%
    final String API_STACK_EXCHANGE_SEARCH = "https://api.stackexchange.com/2.2/search";

    String intitle = request.getParameter("intitle");

    URL url = new URL(API_STACK_EXCHANGE_SEARCH + "?order=desc&sort=activity&site=stackoverflow&intitle=" + URLEncoder.encode(intitle, "UTF-8"));

    URLConnection urlConnection = url.openConnection();
    urlConnection.setDoOutput(true);
    urlConnection.setDoInput(true);

    GZIPInputStream inputStreamGzip = new GZIPInputStream(urlConnection.getInputStream());
    final int bufferSize = 1024;
    final char[] buffer = new char[bufferSize];
    final StringBuilder sb = new StringBuilder();
    Reader in = new InputStreamReader(inputStreamGzip, "UTF-8");
    int readBytes;
    while ((readBytes = in.read(buffer, 0, buffer.length)) != -1) {
        sb.append(buffer, 0, readBytes);
    }
    out.println(sb.toString());
%>
