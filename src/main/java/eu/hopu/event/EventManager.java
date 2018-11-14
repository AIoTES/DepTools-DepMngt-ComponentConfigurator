package eu.hopu.event;

import org.eclipse.jetty.continuation.Continuation;
import org.eclipse.jetty.continuation.ContinuationListener;
import org.eclipse.jetty.continuation.ContinuationSupport;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

public class EventManager {

  private static final byte[] TERMINATION = new byte[]{'\r', '\n'};

  private Set<Continuation> continuations;

  private static EventManager eventManagerInstance;

  public static EventManager getInstance() {
    if (eventManagerInstance == null)
      eventManagerInstance = new EventManager();
    return eventManagerInstance;
  }

  private EventManager() {
    this.continuations = new HashSet<>();
  }

  public void addUser(HttpServletRequest request, HttpServletResponse response) throws IOException {

    response.setContentType("text/event-stream");
    OutputStream output = response.getOutputStream();
    output.write(": waiting for events".getBytes());
    output.write(TERMINATION);
    output.flush();
    response.flushBuffer();

    Continuation c = ContinuationSupport.getContinuation(request);
    c.setTimeout(0);
    c.addContinuationListener(new ContinuationListener() {
      @Override
      public void onTimeout(Continuation continuation) {
        continuation.complete();
      }

      @Override
      public void onComplete(Continuation continuation) {
        continuations.remove(continuation);
      }
    });

    synchronized (this) {
      continuations.add(c);
      c.suspend(response);
    }
  }

  public synchronized void sendEvent(String event, String data) {
    Collection<Continuation> disconnected = new ArrayList<>();

    for (Continuation c : continuations)
      sendWebsocketEvent(event, data, disconnected, c);

    if (!disconnected.isEmpty())
      continuations.removeAll(disconnected);
  }

  private void sendWebsocketEvent(String event, String data, Collection<Continuation> disconnected, Continuation c) {
    try {
      OutputStream output = c.getServletResponse().getOutputStream();
      output.write("event: ".getBytes());
      output.write(event.getBytes("UTF-8"));
      output.write(TERMINATION);
      output.write("data: ".getBytes());
      output.write(data.getBytes("UTF-8"));
      output.write(TERMINATION);
      output.write(TERMINATION);
      output.flush();
      c.getServletResponse().flushBuffer();
    } catch (IOException e) {
      disconnected.add(c);
    }
  }

}
