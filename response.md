It should be able to encode anything ffmpeg can encode. I simply map the array to command line flags. Having said that, ogv failed for me too when I first tried. But it also failed on the comand line:

```
ffmpeg -i assets/video/big_buck_bunny.mov -vcodec libtheora -acodec libvorbis t.ogv
```

I uninstalled and re-installed ffmpeg like so, adding --with-libogg to the list. 

```
brew uninstall ffmpeg

brew install ffmpeg --with-libvorbis --with-nonfree --with-gpl --with-libvpx --with-pthreads --with-libx264 --with-libfaac --with-theora --with-libogg
```

Not sure why that flag was needed, but now I can encode ogv from the command line and with the plugin. 

```
grunt oggtest
```