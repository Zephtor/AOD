#include <gtk/gtk.h>
#include <webkit/webkit.h>

static void activate(GtkApplication *app, gpointer user_data) {
  (void) user_data;
  GtkWidget *window = gtk_application_window_new(app);
  gtk_window_set_title(GTK_WINDOW(window), "AOD Studio");
  gtk_window_set_default_size(GTK_WINDOW(window), 1280, 820);

  GtkWidget *view = webkit_web_view_new();
  gchar *path = g_build_filename("/app", "share", "aod", "index.html", NULL);
  gchar *uri = g_filename_to_uri(path, NULL, NULL);
  webkit_web_view_load_uri(WEBKIT_WEB_VIEW(view), uri);
  gtk_window_set_child(GTK_WINDOW(window), view);
  gtk_window_present(GTK_WINDOW(window));
  g_free(uri);
  g_free(path);
}

int main(int argc, char **argv) {
  GtkApplication *app = gtk_application_new("io.github.Zephtor.AOD", G_APPLICATION_DEFAULT_FLAGS);
  g_signal_connect(app, "activate", G_CALLBACK(activate), NULL);
  int status = g_application_run(G_APPLICATION(app), argc, argv);
  g_object_unref(app);
  return status;
}