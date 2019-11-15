package com.link;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Link";
  }
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Nullable
      @Override
      protected Bundle getLaunchOptions() {
        Intent intent = MainActivity.this.getIntent();
        Bundle bundle = new Bundle();
        bundle.putString("text", intent.getStringExtra(Intent.EXTRA_TEXT));
        return bundle;
      }
    };
  }
}
