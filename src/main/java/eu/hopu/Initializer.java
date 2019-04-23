package eu.hopu;

import eu.hopu.sil.SilClient;
import eu.hopu.sil.SilOkHttpClient;
import eu.hopu.utils.GetEnvOrProperty;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import java.util.LinkedList;
import java.util.List;

@WebListener
public class Initializer implements ServletContextListener {

  public static String CLIENT_ID = "";
  public static SilClient silClient;
  public static List<String> platformTypes;

  @Override
  public void contextInitialized(ServletContextEvent sce) {
    GetEnvOrProperty.getInstance().loadProperties();
    CLIENT_ID = GetEnvOrProperty.getInstance().get("CLIENT_ID");

    platformTypes = new LinkedList<>();
    String sil_url = GetEnvOrProperty.getInstance().get("SIL_URL");
    silClient = new SilOkHttpClient(sil_url);
  }

  @Override
  public void contextDestroyed(ServletContextEvent sce) {
  }

}
