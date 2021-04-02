package com.example.wbdvsp2102hanyserverjava.services;
import com.example.wbdvsp2102hanyserverjava.models.Widget;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WidgetService {
    private List<Widget> widgets = new ArrayList<Widget>();
    {
        Widget w1 = new Widget(123l, "60613d7407f0420017551fe1", "HEADING", 1, "Welcome to Widgets",
                "",null,"",null,null,"","","");
        Widget w2 = new Widget(234l, "60613e4507f0420017551fe6", "PARAGRAPH", 1, "This is a paragraph",
                "",null,"",null,null,"","","");
        Widget w3 = new Widget(345l, "60613e4507f0420017551fe6", "HEADING", 2, "Welcome to WebDev",
                "",null,"",null,null,"","","");
        Widget w4 = new Widget(456l, "60613e4507f0420017551fe6", "PARAGRAPH", 1, "Lorem ipsum",
                "",null,"",null,null,"","","");
        widgets.add(w1);
        widgets.add(w2);
        widgets.add(w3);
        widgets.add(w4);
    }
    // implement crud operations
    public Widget createWidgetForTopic(Widget widget) {
        Long id = (new Date()).getTime();
        widget.setId(id);
        widgets.add(widget);
        return widget;
    }
    public List<Widget> findAllWidgets() {
        return widgets;
    }
    public List<Widget> findWidgetsForTopic(String topicId) {
        List<Widget> ws = new ArrayList<Widget>();
        for(Widget w: widgets) {
            if(w.getTopicId().equals(topicId)) {
                ws.add(w);
            }
        }
        return ws;
    }
    public Widget findWidgetById(Long id) {
        for(Widget w: widgets) {
            if(w.getId().equals(id)) {
                return w;
            }
        }
        return null;
    }
    public Integer updateWidget(Long id, Widget newWidget) {
        for(int i=0; i<widgets.size(); i++) {
            Widget w = widgets.get(i);
            if(w.getId().equals(id)) {
                widgets.set(i, newWidget);
                return 1;
            }
        }
        return -1;
    }
    public Integer deleteWidget(Long id) {
        int index = -1;
        for(int i=0; i<widgets.size(); i++) {
            Widget w = widgets.get(i);
            if(w.getId().equals(id)) {
                index = i;
            }
        }
        if(index >= 0) {
            widgets.remove(index);
            return 1;
        }
        return -1;
    }
}
