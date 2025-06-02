import React from 'react';
import {Image, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {wp} from '../../../config/dimension';
import colors from '../../../config/colors';
import fonts from '../../../config/fonts';
import {useNavigation} from '@react-navigation/native';
import icons from '../../../config/icons';

export const NewsListCard = ({data}: any) => {
  const navigation = useNavigation() as any;
  const url = data.urlToImage ? {uri: data.urlToImage} : icons.common.defaultNews;
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate('newsDetails', {url: data.url});
      }}>
      <Image
        source={url}
        style={styles.image}
        defaultSource={icons.common.defaultNews}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {data.title}
        </Text>
        <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
          {data.description}
        </Text>
        <Text style={styles.author} numberOfLines={1} ellipsizeMode="tail">
          {data.author}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: wp(10),
    gap: wp(10),
    width: '100%',
  },
  image: {
    width: wp(130),
    height: wp(130),
    borderRadius: wp(8),
    resizeMode: 'cover',
    backgroundColor: colors.secondaryText,
  },
  textContainer: {
    flex: 1,
    gap: wp(10),
    justifyContent: 'space-between',
  },
  title: {
    fontSize: wp(18),
    color: colors.primaryText,
    fontFamily: fonts.GloryBold,
  },
  description: {
    fontSize: wp(16),
    color: colors.secondaryText,
    fontFamily: fonts.GloryBold,
  },
  author: {
    fontSize: wp(16),
    color: colors.primaryText,
    fontFamily: fonts.GloryBold,
    textAlign: 'right',
  },
});
