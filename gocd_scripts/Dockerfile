FROM ubuntu

RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get install -y build-essential

# Install GIT and wget for Ruby install
RUN apt-get install -y git
RUN apt-get install -y wget
RUN apt-get install -y libssl-dev
RUN apt-get install -y libreadline-dev
RUN apt-get install -y curl # For Bundler
RUN apt-get install -y python
RUN apt-get install -y pkg-config
RUN apt-get install -y libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev # for node-canvas

#Adding in gemrc that skips the rdoc installs
RUN echo 'gem: --no-rdoc --no-ri' >> /.gemrc
ENV CONFIGURE_OPTS --disable-install-rdoc
RUN apt-get install -y rbenv
RUN git clone https://github.com/sstephenson/ruby-build.git && cd ruby-build && ./install.sh
RUN ruby-build 2.1.2 /usr/local
RUN gem install bundler

# Javascript fu
RUN mkdir nodetmp && cd nodetmp && wget http://nodejs.org/dist/v0.10.32/node-v0.10.32-linux-x64.tar.gz && tar --strip-components 1 -xvf node-v0.10.32-linux-x64.tar.gz && cp -r . /usr/local
