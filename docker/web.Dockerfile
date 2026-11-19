FROM python:3.13-slim@sha256:e48f59cdba69a3cbd9ed2cf0f348d90d45a8d350d98134cf1070bc106ee9ed90 AS build
WORKDIR /src
COPY scripts/ scripts/
COPY assets/ assets/
COPY content/ content/
COPY data/ data/
COPY index.html site-catalog.json ./
RUN python3 scripts/build_data.py --check && bash scripts/stage_pages.sh

FROM nginxinc/nginx-unprivileged:1.28-alpine@sha256:7377697a821c131a924a7105fafbe7414db4e9fcc77a6f08f776f33f141ec3f8
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/_site/ /srv/site/
USER 101
EXPOSE 8080
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 CMD wget -q --spider http://127.0.0.1:8080/ || exit 1
