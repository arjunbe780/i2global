import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import {wp} from '../../config/dimension';
import {IconButton} from 'react-native-paper';
import colors from '../../config/colors';
import {useNavigation, useRoute} from '@react-navigation/native';

const NewsDetails = () => {
  const route = useRoute() as any;
  const navigation = useNavigation() as any;
  const url = route.params.url;
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="rgba(255,255,255,255)"
      />
      <View style={styles.backButtonContainer}>
        <IconButton
          icon={'arrow-left'}
          size={wp(28)}
          iconColor={colors.primaryBackground}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
      </View>
      <WebView
        key="comp1"
        ref={() => {}}
        useWebKit={true}
        source={{uri: url}}
        style={styles.container}
        allowStorage={false}
        cacheEnabled={false}
        originWhitelist={['*']}
        mixedContentMode={'compatibility'}
        javaScriptEnabled={true}
        cacheMode={'LOAD_NO_CACHE'}
        domStorageEnabled={true}
        allowsInlineMediaPlayback
        allowsFullscreenVideo={true}
        mediaPlaybackRequiresUserAction={false}
        onError={(syntheticEvent: any) => {
          const {nativeEvent} = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        onNavigationStateChange={() => {}}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 30,
    left: 15,
    zIndex: 1,
  },
  backButton: {
    margin: 0,
    backgroundColor: '#8EBBFF',
  },
});

export default NewsDetails;
