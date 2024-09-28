package com.example.tictactoe

import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import com.example.tictactoegame.R

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Find the WebView element in the layout
        val webView: WebView = findViewById(R.id.webview)

        // Enable JavaScript for the WebView
        webView.settings.javaScriptEnabled = true

        // Ensure WebView opens URLs in the WebView itself
        webView.webViewClient = WebViewClient()

        // Load your local HTML file from the assets folder
        webView.loadUrl("file:///android_asset/index.html")
    }
}
