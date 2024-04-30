package com.mdtrack.souser;


import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.provider.MediaStore;
import android.widget.Toast;
import com.facebook.react.bridge.Callback;




import static android.app.Activity.RESULT_OK;


public class FileUploadOverLay extends ReactContextBaseJavaModule implements ActivityEventListener {

    private String imagepath="";


    public FileUploadOverLay(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
    }

    @Override
    public String getName() {
        return "FileUploadOverLay";
    }

    @ReactMethod
    public void toggle(Boolean show) {
        final Activity activity = getCurrentActivity();
        //PUT YOUR NATIVE CODE HERE


        if (show) {

            Intent intent = new Intent();
             intent.setType("file/*"); // intent.setType("video/*"); to select videos to upload file/*
            //intent.setType("image/jpeg");// intent.setType("video/*"); to select videos to upload
            intent.setAction(Intent.ACTION_GET_CONTENT);
            activity.startActivityForResult(Intent.createChooser(intent, "Select Picture"), 1);
        }


    }

    @ReactMethod
    public void getfilepath(Callback callback) {

        callback.invoke(imagepath);
        //Toast.makeText(getCurrentActivity(),imagepath,Toast.LENGTH_SHORT).show();

    }


    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if (requestCode == 1 && resultCode == RESULT_OK) {

            Uri selectedImageUri = data.getData();
             imagepath = getPath(selectedImageUri);


        }
    }
    public String getPath(Uri uri) {

        String[] projection = {MediaStore.Images.Media.DATA};
        Cursor cursor = getCurrentActivity().getContentResolver().query(uri, projection, null, null, null);
        int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
        cursor.moveToFirst();
        return cursor.getString(column_index);
    }

    @Override
    public void onNewIntent(Intent intent) {

    }
}