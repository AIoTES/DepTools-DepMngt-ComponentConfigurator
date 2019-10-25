package eu.hopu;

import eu.hopu.sil.SilClient;
import eu.hopu.sil.SilOkHttpClient;
import eu.hopu.sil.dto.ClientSil;
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
  private ClientSil client;

  @Override
  public void contextInitialized(ServletContextEvent sce) {
    silClient = new SilOkHttpClient(
      GetEnvOrProperty.getInstance().get("SIL_URL"),
      GetEnvOrProperty.getInstance().get("BASE_PATH")
    );

    client = new ClientSil(
      GetEnvOrProperty.getInstance().get("CLIENT_ID"),
      GetEnvOrProperty.getInstance().get("CALLBACK_URL"),
      GetEnvOrProperty.getInstance().get("RECEIVING_CAPACITY"),
      GetEnvOrProperty.getInstance().get("RESPONSE_FORMAT"),
      GetEnvOrProperty.getInstance().get("RESPONSE_DELIVERY")
    );
    silClient.registerClient(client);

    GetEnvOrProperty.getInstance().loadProperties();
    CLIENT_ID = GetEnvOrProperty.getInstance().get("CLIENT_ID");


    platformTypes = new LinkedList<>();
  }

  @Override
  public void contextDestroyed(ServletContextEvent sce) {
  }

}
