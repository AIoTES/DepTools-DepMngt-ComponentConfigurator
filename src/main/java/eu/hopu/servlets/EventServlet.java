package eu.hopu.servlets;

import eu.hopu.event.EventManager;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "EventServletv", urlPatterns = "/api/v1/event/*", loadOnStartup = 1, asyncSupported = true)
public class EventServlet extends HttpServlet {

  private EventManager eventManager;

  public EventServlet() {
    this.eventManager = EventManager.getInstance();
  }

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    eventManager.addUser(request, response);
  }

}
