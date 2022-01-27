package ti.exoplayer;

import android.content.res.Resources;
import android.view.LayoutInflater;
import android.view.View;

import com.potyvideo.library.AndExoPlayerView;

import org.appcelerator.kroll.KrollDict;
import org.appcelerator.titanium.proxy.TiViewProxy;
import org.appcelerator.titanium.view.TiUIView;

import java.util.HashMap;

public class VideoPlayerView extends TiUIView {
    AndExoPlayerView playerView;

    public VideoPlayerView(TiViewProxy proxy) {
        super(proxy);
        String packageName = proxy.getActivity().getPackageName();
        Resources resources = proxy.getActivity().getResources();
        View viewWrapper;

        int resId_viewHolder;
        int resIdPublish;

        resId_viewHolder = resources.getIdentifier("layout_main", "layout", packageName);
        resIdPublish = resources.getIdentifier("andExoPlayerView", "id", packageName);

        LayoutInflater inflater = LayoutInflater.from(proxy.getActivity());
        viewWrapper = inflater.inflate(resId_viewHolder, null);
        playerView = (AndExoPlayerView) viewWrapper.findViewById(resIdPublish);
        setNativeView(viewWrapper);
    }

    @Override
    public void processProperties(KrollDict d) {
        super.processProperties(d);
    }

    public void setUrl(String url){
      HashMap<String, String> extraHeaders = new HashMap<>();
      playerView.setSource(url, extraHeaders);
    }

    public void play() {
        playerView.startPlayer();
    }

    public void stop() {
        playerView.stopPlayer();
    }

    public void pause() {
        playerView.pausePlayer();
    }
}
