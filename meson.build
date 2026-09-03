project('aod', 'c', version: '0.1.0')

gtk = dependency('gtk4')
webkit = dependency('webkitgtk-6.0')

executable(
  'aod',
  'src/main.c',
  dependencies: [gtk, webkit],
  install: true,
)

install_data('data/index.html', install_dir: get_option('datadir') / 'aod')
install_data('data/style.css', install_dir: get_option('datadir') / 'aod')
install_data('data/app.js', install_dir: get_option('datadir') / 'aod')
install_data('io.github.Zephtor.AOD.desktop', install_dir: get_option('datadir') / 'applications')
install_data('data/io.github.Zephtor.AOD.svg', install_dir: get_option('datadir') / 'icons/hicolor/scalable/apps')
install_data('data/io.github.Zephtor.AOD.metainfo.xml', install_dir: get_option('datadir') / 'metainfo')