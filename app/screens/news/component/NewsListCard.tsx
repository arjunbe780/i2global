import React, {useEffect, useState} from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {wp} from '../../../config/dimension';
import colors from '../../../config/colors';
import fonts from '../../../config/fonts';
import {createThumbnail} from 'react-native-create-thumbnail';

export const NewsListCard = ({data}: any) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{uri: data.url}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {data.name}
        </Text>
        <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
          {data.description}
        </Text>
        <Text style={styles.author} numberOfLines={1} ellipsizeMode="tail">
          {data.author}
        </Text>
      </View>
    </View>
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
