package ti.exoplayer;

import android.app.Activity;

import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.annotations.Kroll;
import org.appcelerator.kroll.common.TiConfig;
import org.appcelerator.titanium.TiC;
import org.appcelerator.titanium.proxy.TiViewProxy;
import org.appcelerator.titanium.util.TiConvert;
import org.appcelerator.titanium.view.TiUIView;


// This proxy can be created by calling TiExoplayer.createExample({message: "hello world"})
@Kroll.proxy(creatableInModule = TiExoplayerModule.class)
public class VideoPlayerProxy extends TiViewProxy {
    // Standard Debugging variables
    private static final String LCAT = "VideoPlayerProxy";
    private static final boolean DBG = TiConfig.LOGD;
    private String url = "";

    // Constructor
    public VideoPlayerProxy() {
        super();
    }

    @Override
    public TiUIView createView(Activity activity) {
        TiUIView view = new VideoPlayerView(this);
        view.getLayoutParams().autoFillsHeight = true;
        view.getLayoutParams().autoFillsWidth = true;
        return view;
    }

    protected VideoPlayerView getView() {
        return (VideoPlayerView) getOrCreateView();
    }

    // Handle creation options
    @Override
    public void handleCreationDict(KrollDict options) {
        super.handleCreationDict(options);

        if (options.containsKey(TiC.PROPERTY_URL)) {
            url = TiConvert.toString(getProperty(TiC.PROPERTY_URL), "");
            getView().setUrl(url);
        }
    }

    @Kroll.getProperty
    public String getUrl() {
        return url;
    }

    @Kroll.setProperty
    public void setUrl(String _url) {
        url = _url;
        getView().setUrl(url);
    }

    private String getPathToApplicationAsset(String assetName) {
        return resolveUrl(null, assetName);
    }

    @Kroll.method
    public void play() {
        getView().play();
    }
    @Kroll.method
    public void stop() {
        getView().stop();
    }
    @Kroll.method
    public void pause() {
        getView().pause();
    }


}
