import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

function ResumeView({
    userInfo,
    selectSummaries,
    selectEducations,
    selectExperiences,
    selectSkills,
}) {
    const styles = StyleSheet.create({
        page: {
            backgroundColor: "#FFF",
        },
        section: {
            padding: 10,
            width: "85%",
            margin: "10 auto",
        },
        title: {
            display: "block",
            fontSize: 24,
            textAlign: "center",
        },
        text: {
            fontSize: 14,
        },
        spread: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        },
        userInfo: {
            name: {
                display: "block",
                fontWeight: "bold",
                fontSize: 30,
                textAlign: "center",
                marginTop: 20,
            },
            info: {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                fontSize: 14,
                marginTop: 14,
            },
        },
        summary: {
            view: {
                display: "block",
                marginTop: 20,
            },
            displayName: {
                display: "block",
                fontSize: 14,
                textAlign: "center",
            },
            description: {
                marginTop: 15,
                fontSize: 14,
            },
        },
        education: {
            view: {
                display: "flex",
                flexDirection: "column",
                marginTop: 15,
                gap: 5,
            },
        },
        skill: {
            spread: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 5,
            },
            text: {
                width: "24%",
                fontSize: 14,
                textAlign: "center",
            },
        },
    });

    return (
        <Document style={styles.document}>
            <Page size="A4" styles={styles.page}>
                {/* User Info */}
                <View style={styles.section}>
                    <Text style={styles.userInfo.name}>
                        {userInfo.fullName}
                    </Text>
                    <View style={styles.userInfo.info}>
                        <Text>{userInfo.email}</Text>
                        <Text>{userInfo.phone}</Text>
                        <Text>{userInfo.website}</Text>
                        <Text>{userInfo.location}</Text>
                    </View>
                </View>
                {/* Summary */}
                <View style={styles.section}>
                    {selectSummaries.length > 0 && (
                        <Text style={styles.title}>Summary</Text>
                    )}
                    {selectSummaries.map((summary) => {
                        const val = summary.value;
                        return (
                            <View style={styles.summary.view}>
                                <Text style={styles.summary.displayName}>
                                    {val.displayName}
                                </Text>
                                <Text style={styles.summary.description}>
                                    {val.description}
                                </Text>
                            </View>
                        );
                    })}
                </View>
                {/* Education */}
                <View style={styles.section}>
                    {selectEducations.length > 0 && (
                        <Text style={styles.title}>Education</Text>
                    )}
                    {selectEducations.map((education) => {
                        const val = education.value;
                        return (
                            <View style={styles.education.view}>
                                <View style={styles.spread}>
                                    <Text style={styles.text}>
                                        {val.universityName}
                                    </Text>
                                    <Text style={styles.text}>
                                        {val.startDate}
                                        {val.endDate
                                            ? ` - ${val.endDate}`
                                            : " - Present"}
                                    </Text>
                                </View>
                                <View style={styles.spread}>
                                    <Text style={styles.text}>
                                        {val.degree} in {val.major}
                                    </Text>
                                    {val.gpa && (
                                        <Text style={styles.text}>
                                            Cumulative GPA: {val.gpa}
                                        </Text>
                                    )}
                                </View>
                                {val.description && (
                                    <View>
                                        <Text style={styles.text}>
                                            {val.description}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </View>
                {/* Experience */}
                <View style={styles.section}>
                    {selectExperiences.length > 0 && (
                        <Text style={styles.title}>Experience</Text>
                    )}
                    {selectExperiences.map((experience) => {
                        const val = experience.value;
                        return (
                            <View style={styles.education.view}>
                                <View style={styles.spread}>
                                    <Text style={styles.text}>
                                        {val.companyName} | {val.role}
                                    </Text>
                                    <Text style={styles.text}>
                                        {val.startDate}
                                        {val.endDate
                                            ? ` - ${val.endDate}`
                                            : " - Present"}
                                    </Text>
                                </View>
                                {val.description && (
                                    <Text style={styles.text}>
                                        {val.description}
                                    </Text>
                                )}
                            </View>
                        );
                    })}
                </View>
                {/* Skills */}
                <View>
                    {selectSkills.length > 0 && (
                        <Text style={styles.title}>Skill</Text>
                    )}
                    <View style={styles.skill.spread}>
                        {selectSkills.map((skill) => {
                            const val = skill.value;
                            return (
                                <Text style={styles.skill.text}>
                                    {val.name}
                                </Text>
                            );
                        })}
                    </View>
                </View>
            </Page>
        </Document>
    );
}

export default ResumeView;
