package com.example.drawing.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type",
        defaultImpl = MyCircle.class
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = MyCircle.class, name = "1"),
        @JsonSubTypes.Type(value = MyRect.class, name = "2"),
        @JsonSubTypes.Type(value = MyEllipse.class, name = "3"),
        @JsonSubTypes.Type(value = MyRect.class, name = "4"),
        @JsonSubTypes.Type(value = MyLine.class, name = "5"),
        @JsonSubTypes.Type(value = MyTriangle.class, name = "6")
})
public interface shape {
    public  int getType();
    public void setType();
}
