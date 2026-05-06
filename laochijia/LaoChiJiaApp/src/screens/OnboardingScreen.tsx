import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, PreferenceTags } from '../types';
import { Colors, Spacing } from '../constants';
import Text from '../components/Text';
import Button from '../components/Button';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const onboardingSteps = [
  {
    title: '发现美食',
    description: '探索身边的美食，找到真正的吃货推荐',
    icon: '🍜',
  },
  {
    title: '真实评价',
    description: '五星级评价系统，真实用户体验分享',
    icon: '⭐',
  },
  {
    title: '吃货社区',
    description: '加入老吃家社区，一起寻找美味',
    icon: '👥',
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const isLastStep = currentStep === onboardingSteps.length - 1;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {!isLastStep ? (
          <View style={styles.stepContainer}>
            <View style={styles.iconContainer}>
              <Text variant="h1">{onboardingSteps[currentStep].icon}</Text>
            </View>
            <Text variant="h2" align="center" style={styles.title}>
              {onboardingSteps[currentStep].title}
            </Text>
            <Text variant="body" color="secondary" align="center" style={styles.description}>
              {onboardingSteps[currentStep].description}
            </Text>
          </View>
        ) : (
          <View style={styles.preferencesContainer}>
            <Text variant="h2" align="center" style={styles.title}>
              选择你的口味偏好
            </Text>
            <Text variant="body" color="secondary" align="center" style={styles.description}>
              帮你推荐更多爱吃的美食
            </Text>
            <ScrollView style={styles.tagsContainer} showsVerticalScrollIndicator={false}>
              <View style={styles.tagsGrid}>
                {PreferenceTags.map((tag) => (
                  <TouchableOpacity
                    key={tag}
                    style={[
                      styles.tag,
                      selectedTags.includes(tag) && styles.tagSelected,
                    ]}
                    onPress={() => toggleTag(tag)}
                  >
                    <Text
                      variant="body"
                      color={selectedTags.includes(tag) ? 'inverse' : 'primary'}
                    >
                      {tag}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <Text variant="caption" color="tertiary" align="center">
              已选择 {selectedTags.length} 个 · 获得 50 吃货分
            </Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.dotsContainer}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentStep && styles.dotActive,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonsContainer}>
          {currentStep > 0 && (
            <TouchableOpacity onPress={() => setCurrentStep(currentStep - 1)}>
              <Text variant="body" color="tertiary">
                上一步
              </Text>
            </TouchableOpacity>
          )}
          <Button
            title={isLastStep ? '开始探索' : '下一步'}
            onPress={handleNext}
            style={currentStep === 0 ? styles.fullWidthButton : styles.nextButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: Spacing.xl,
    justifyContent: 'center',
  },
  stepContainer: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    marginBottom: Spacing.md,
  },
  description: {
    maxWidth: 280,
  },
  preferencesContainer: {
    flex: 1,
    paddingTop: Spacing.xl,
  },
  tagsContainer: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  tagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  tag: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tagSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  footer: {
    padding: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.primary,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fullWidthButton: {
    flex: 1,
  },
  nextButton: {
    flex: 1,
    marginLeft: Spacing.md,
  },
});
