package eu.hopu;

import eu.hopu.utils.GetEnvOrProperty;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class Initializer implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        GetEnvOrProperty.getInstance().loadProperties();
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
    }

}
