FROM tomcat:alpine

ENV DOCKER="True"
ENV PROPERTIES_PATH="/usr/local/properties/config.properties"

RUN rm -rf /usr/local/tomcat/webapps/*
ADD target/activage-component-configurator.war /usr/local/tomcat/webapps/ROOT.war

ADD src/main/resources/config.properties /usr/local/properties/config.properties

CMD ["catalina.sh", "run"]
